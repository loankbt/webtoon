package com.example.demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		loadDotenv();
		SpringApplication.run(DemoApplication.class, args);
	}

	private static void loadDotenv() {
		Path envFile = Path.of(".env");
		if (!Files.isRegularFile(envFile)) {
			return;
		}

		try {
			List<String> lines = Files.readAllLines(envFile, StandardCharsets.UTF_8);
			for (String line : lines) {
				String trimmed = line.trim();
				if (trimmed.isEmpty() || trimmed.startsWith("#")) {
					continue;
				}
				int separator = trimmed.indexOf('=');
				if (separator < 0) {
					continue;
				}
				String key = trimmed.substring(0, separator).trim();
				String value = trimmed.substring(separator + 1).trim();
				if (value.length() >= 2 && ((value.startsWith("\"") && value.endsWith("\""))
						|| (value.startsWith("'") && value.endsWith("'")))) {
					value = value.substring(1, value.length() - 1);
				}
				// Real environment variables take precedence over .env values.
				if (System.getenv(key) == null && System.getProperty(key) == null) {
					System.setProperty(key, value);
				}
			}
		} catch (IOException ex) {
			throw new IllegalStateException("Failed to read .env file", ex);
		}
	}

}
