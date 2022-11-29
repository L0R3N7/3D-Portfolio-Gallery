package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;

@Entity
public class Position extends PanacheEntity {

    public Long x;

    public Long y;

    public boolean is_wall;

    // relationship

    @ManyToOne
    public Room room;

    @OneToOne(mappedBy = "position", cascade = CascadeType.ALL)
    public Exhibit exhibit;

}
