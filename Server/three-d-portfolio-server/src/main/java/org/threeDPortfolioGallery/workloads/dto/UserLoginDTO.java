package org.threeDPortfolioGallery.workloads.dto;

import java.io.Serializable;

public class UserLoginDTO implements Serializable {
    String emailOrUsername;
    String password;

    public UserLoginDTO(String emailOrUsername, String password) {
        this.emailOrUsername = emailOrUsername;
        this.password = password;
    }

    public String getEmailOrUsername() {
        return emailOrUsername;
    }

    public String getPassword() {
        return password;
    }

    public void setEmailOrUsername(String emailOrUsername) {
        this.emailOrUsername = emailOrUsername;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
