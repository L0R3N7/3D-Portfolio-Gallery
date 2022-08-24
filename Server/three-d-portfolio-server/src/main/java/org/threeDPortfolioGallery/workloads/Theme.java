package org.threeDPortfolioGallery.workloads;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mat_object;

    private String mat_inside;

    private  int light_intensity;

    private String model_path;

    // TODO relation exhibit, exhibition

    // region ♡ getter setter ♡
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMat_object() {
        return mat_object;
    }

    public void setMat_object(String mat_object) {
        this.mat_object = mat_object;
    }

    public String getMat_inside() {
        return mat_inside;
    }

    public void setMat_inside(String mat_inside) {
        this.mat_inside = mat_inside;
    }

    public int getLight_intensity() {
        return light_intensity;
    }

    public void setLight_intensity(int light_intensity) {
        this.light_intensity = light_intensity;
    }

    public String getModel_path() {
        return model_path;
    }

    public void setModel_path(String model_path) {
        this.model_path = model_path;
    }
    // endregion
}
