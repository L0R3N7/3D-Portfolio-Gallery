package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.smallrye.common.constraint.NotNull;

import javax.persistence.*;
import java.lang.reflect.Type;
import java.util.List;

@Entity
public class Theme extends PanacheEntity {

    public String name;

    public String mat_object;

    public String mat_inside;

    public  float light_intensity;

    public String model_path;

    @NotNull
    public Boolean is_exhibit;

    // relations
    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    public List<Exhibit> exhibits;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    public List<Exhibition> exhibitions;
}
