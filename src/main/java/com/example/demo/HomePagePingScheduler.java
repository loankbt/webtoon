package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class HomePagePingScheduler {

    private static final Logger log = LoggerFactory.getLogger(HomePagePingScheduler.class);

    private final WebClient webClient;
    private final String homeUrl;

    public HomePagePingScheduler(@Value("${app.keepalive.url}") String homeUrl) {
        this.homeUrl = homeUrl;
        this.webClient = WebClient.create();
    }

    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void pingHomePage() {
        webClient.get()
                .uri(homeUrl)
                .retrieve()
                .toBodilessEntity()
                .doOnSuccess(response -> log.info("Keep-alive ping to {} succeeded: {}", homeUrl, response.getStatusCode()))
                .doOnError(error -> log.warn("Keep-alive ping to {} failed: {}", homeUrl, error.getMessage()))
                .onErrorComplete()
                .subscribe();
    }
}
