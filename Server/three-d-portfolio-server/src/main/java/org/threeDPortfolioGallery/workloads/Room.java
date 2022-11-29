package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Room extends PanacheEntity {

    public String name;

    public int positions_amount;

    public String room_url;

    // relationship

    @ManyToOne
    public Exhibition exhibition;

    @OneToMany(mappedBy = "room")
    public List<Position> positions;

}
