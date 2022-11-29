package org.threeDPortfolioGallery.workloads;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Exhibit extends PanacheEntity {

    public String url;

    public String data_type;

    public String title;

    public String description;

    // relationships

    @JsonIgnore
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Exhibition exhibition;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Theme theme;

    @OneToOne
    public Position position;
}
