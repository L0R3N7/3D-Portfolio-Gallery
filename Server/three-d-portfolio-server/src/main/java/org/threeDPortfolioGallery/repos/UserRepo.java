package org.threeDPortfolioGallery.repos;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.threeDPortfolioGallery.workloads.User;
import org.threeDPortfolioGallery.workloads.dto.UserLoginDTO;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepo implements PanacheRepository<User> {

    @Override
    public int update(String query, Object... params) {
        return PanacheRepository.super.update(query, params);
    }

    public Boolean isUser(UserLoginDTO loginDTO) {
        return this.getEntityManager().createQuery("select u.user_name from User u where (u.email like :emailOrUsername or u.user_name like :emailOrUsername) and u.password like :pass")
                .setParameter("emailOrUsername",loginDTO.getEmailOrUsername())
                .setParameter("pass", loginDTO.getPassword())
                .getResultList().size() > 0;
    }
}
