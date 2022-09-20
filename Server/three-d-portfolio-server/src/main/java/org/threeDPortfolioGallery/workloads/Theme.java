package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Theme extends PanacheEntity {

    private String mat_object;

    private String mat_inside;

    private  int light_intensity;

    private String model_path;

    // TODO relation exhibit, exhibition

}
