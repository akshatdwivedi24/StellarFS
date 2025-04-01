package com.stellarfs.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public void handleError(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpStatus status = getStatus(request);
        
        // For OAuth2 related errors, redirect to frontend with error
        if (request.getRequestURI().startsWith("/oauth2/") || 
            request.getRequestURI().startsWith("/login/")) {
            response.sendRedirect("http://localhost:5173?error=true");
            return;
        }

        // For other errors, redirect to frontend with appropriate error message
        String errorMessage = "An unexpected error occurred";
        switch (status) {
            case UNAUTHORIZED:
                errorMessage = "Please log in to access this resource";
                break;
            case FORBIDDEN:
                errorMessage = "You don't have permission to access this resource";
                break;
            case NOT_FOUND:
                errorMessage = "The requested resource was not found";
                break;
            case INTERNAL_SERVER_ERROR:
                errorMessage = "An internal server error occurred";
                break;
            default:
                errorMessage = "An unexpected error occurred";
                break;
        }
        
        response.sendRedirect("http://localhost:5173?error=" + errorMessage);
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
} 