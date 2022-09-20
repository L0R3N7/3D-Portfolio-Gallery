package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exhibition extends PanacheEntity {

    private String thumbnail_url;

    private String title;

    // TODO relationship to room, theme, exhibit

}
