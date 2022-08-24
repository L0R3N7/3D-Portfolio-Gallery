package org.threeDPortfolioGallery.workloads;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int positions_amount;

    private String room_url;

    // TODO relationship to position, exhibition

    // region ♡ getter setter ♡
}
