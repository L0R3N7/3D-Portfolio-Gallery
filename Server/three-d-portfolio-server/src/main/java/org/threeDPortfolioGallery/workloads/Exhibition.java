package org.threeDPortfolioGallery.workloads;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exhibition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String thumbnail_url;

    private String title;

    // TODO relationship to room, theme, exhibit

    // region ♡ getter setter ♡

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThumbnail_url() {
        return thumbnail_url;
    }

    public void setThumbnail_url(String thumbnail_url) {
        this.thumbnail_url = thumbnail_url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // endregion
}
