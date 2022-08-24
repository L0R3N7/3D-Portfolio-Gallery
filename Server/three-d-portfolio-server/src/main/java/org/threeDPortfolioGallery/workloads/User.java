package org.threeDPortfolioGallery.workloads;


import javax.persistence.*;

@Entity
@Table(name="users")        // causes exception if not here because "User" (in Postgres) is reserved
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user_name;

    private String email;

    private String iconUrl;

    // TODO relationship exhibition


    // region ♡ getter setter ♡
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String username) {
        this.user_name = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    // endregion

}
