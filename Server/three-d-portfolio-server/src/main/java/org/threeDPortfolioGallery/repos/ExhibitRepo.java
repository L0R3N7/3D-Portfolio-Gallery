package org.threeDPortfolioGallery.repos;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.threeDPortfolioGallery.workloads.Exhibit;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ExhibitRepo implements PanacheRepository<Exhibit> {
}
