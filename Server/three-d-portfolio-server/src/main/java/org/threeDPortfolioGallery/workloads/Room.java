package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room extends PanacheEntity {

    private String name;

    private int positions_amount;

    private String room_url;

    // TODO relationship to position, exhibition

}
