package com.carsystem.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, StringBuilder htmlBody) {
        try {
            // Clean the email
            String cleanedTo = to.trim().replaceAll("[\\p{Cntrl}\\s]", "");

            // Debug output to see what's being used
            System.out.println("Sending email to: [" + cleanedTo + "]");

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("luxorarentalservice@gmail.com");
            helper.setTo(cleanedTo); // Use cleaned email
            helper.setSubject(subject);
            helper.setText(htmlBody.toString(), true);

            mailSender.send(message);
            System.out.println("HTML Email sent successfully to " + cleanedTo);
        } catch (MessagingException e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace(); // Print stack trace to see exact error line
        }
    }

}