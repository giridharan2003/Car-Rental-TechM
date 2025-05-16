package com.carsystem.app.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RestUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static ResponseEntity<Map<String, Object>> postForEntityHandlingErrors(RestTemplate restTemplate, String url, Object request) {
        try {
            String response = restTemplate.postForEntity(url, request, String.class).getBody();
            Map<String, Object> responseMap = objectMapper.readValue(response,
                    new TypeReference<Map<String, Object>>() {
                    });
            return ResponseEntity.ok(responseMap);

        } catch (Unauthorized e) {

            Map<String, Object> unauthorizedMap = new HashMap<>();
            try {
                unauthorizedMap = objectMapper.readValue(e.getResponseBodyAsString(),
                        new TypeReference<Map<String, Object>>() {});
            } catch (Exception parseEx) {
                unauthorizedMap.put("message", "Invail userName or Pasword");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(unauthorizedMap);

        } catch (HttpClientErrorException e) {
            
            try {
                Map<String, Object> errorMap = objectMapper.readValue(e.getResponseBodyAsString(),
                        new TypeReference<Map<String, Object>>() {});
                return ResponseEntity.status(e.getStatusCode()).body(errorMap);
            } catch (Exception jsonEx) {
                Map<String, Object> fallbackError = new HashMap<>();
                fallbackError.put("message", e.getResponseBodyAsString());
                return ResponseEntity.status(e.getStatusCode()).body(fallbackError);
            }

        } catch (Exception ex) {
            Map<String, Object> unexpectedError = new HashMap<>();
            unexpectedError.put("message", "Unexpected error");
            return ResponseEntity.internalServerError().body(unexpectedError);
        }
    }
}
