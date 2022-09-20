package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exhibit extends PanacheEntity {

    private String url;

    private String data_type;

    private String title;

    private String description;

    // TODO relationship to position, theme, exhibition

}
