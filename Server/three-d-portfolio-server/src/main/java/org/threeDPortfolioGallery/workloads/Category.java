package org.threeDPortfolioGallery.workloads;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category extends PanacheEntity {

    public String title;

    public String color;

    // TODO relationship to exhibition n:m

    @ManyToMany
            @JoinTable(
                    name = "exhibitions_categories",
                    joinColumns = @JoinColumn(name = "category_id"),
                    inverseJoinColumns = @JoinColumn(name = "exhibition_id")
            )
    List<Exhibition> exhibitions;
    /*

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    List<Exhibition> likedCourses;
*/

}
