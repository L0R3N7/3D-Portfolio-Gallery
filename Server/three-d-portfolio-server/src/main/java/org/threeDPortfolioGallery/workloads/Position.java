package org.threeDPortfolioGallery.workloads;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long x;

    private Long y;

    private boolean is_wall;

    // TODO relationship to room, exhibit

    // region ♡ getter setter ♡

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public boolean isIs_wall() {
        return is_wall;
    }

    public void setIs_wall(boolean is_wall) {
        this.is_wall = is_wall;
    }

    // endregion
}
