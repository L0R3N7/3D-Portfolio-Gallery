package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Position extends PanacheEntity {

    private Long x;

    private Long y;

    private boolean is_wall;

    // TODO relationship to room, exhibit


}
