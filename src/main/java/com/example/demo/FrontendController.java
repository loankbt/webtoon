package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping({"/", "/story/**", "/chapter/**"})
    public String index() {
        return "forward:/index.html";
    }
}
