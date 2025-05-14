package com.carsystem.app.util;


import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class RestUtil {

    public static ResponseEntity<String> postForEntityHandlingErrors(RestTemplate restTemplate, String url, Object request) {
        try {
            return restTemplate.postForEntity(url, request, String.class);
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            return ResponseEntity
                    .internalServerError()
                    .body("{\"message\": \"Unexpected error\"}");
        }
    }
}
