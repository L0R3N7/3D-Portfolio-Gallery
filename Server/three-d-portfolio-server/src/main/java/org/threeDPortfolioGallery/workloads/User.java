package org.threeDPortfolioGallery.workloads;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Users")        // causes exception if not here because "User" (in Postgres) is reserved
public class User extends PanacheEntity {

    public String user_name;

    public String email;

    public String iconUrl;

    public String password;

    // relationship exhibition
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    public List<Exhibition> exhibitions;

    public static User create(String user_name, String email, String iconUrl, String password, List<Exhibition> exhibitions) {
        User user = new User();
        user.user_name = user_name;
        user.email = email;
        user.iconUrl = iconUrl;
        user.password = password;
        user.exhibitions = exhibitions;
        return user;
    }
}
