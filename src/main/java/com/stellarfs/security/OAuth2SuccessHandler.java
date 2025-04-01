package com.stellarfs.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException {
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String token = tokenProvider.generateToken(authentication);
            
            log.info("OAuth2 login successful for user: " + oauth2User.getAttribute("email"));
            log.info("Redirecting to frontend: " + frontendUrl);
            
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                    .queryParam("token", token)
                    .build()
                    .toUriString();

            // Clear any existing authentication attributes
            clearAuthenticationAttributes(request);
            
            // Perform the redirect
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
            
        } catch (Exception e) {
            log.error("Error during OAuth2 success handling", e);
            response.sendRedirect(frontendUrl + "?error=authentication_failed");
        }
    }
} 