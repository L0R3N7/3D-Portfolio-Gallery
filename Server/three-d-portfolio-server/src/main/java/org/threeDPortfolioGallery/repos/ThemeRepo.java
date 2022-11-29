package org.threeDPortfolioGallery.repos;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.threeDPortfolioGallery.workloads.Theme;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ThemeRepo implements PanacheRepository<Theme> {

}
