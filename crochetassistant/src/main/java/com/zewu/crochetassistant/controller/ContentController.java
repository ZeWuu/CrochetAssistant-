package com.zewu.crochetassistant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class ContentController {
    
    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error, Model model) {
        if(error != null) {
            model.addAttribute("errorMessage", "Invalid username or password. Please try again.");
        }
        return "login";
    }
    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    
    @GetMapping("/main_menu")
    public String mainMenu() {
        return "mainMenu";
    }

    @GetMapping("/projects")
    public String projects() {
        return "chooseProject";  
    }

    @GetMapping("/stitch-counters")
    public String stitchCounters() {
        return "stitchCounters";  
    }
    
}
