package com.mizule.server.repositories;

import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZulespotRepository extends JpaRepository<Zulespot,String> {
    Optional<Zulespot> findByOwner(String owner);
    Optional<Zulespot> findByTitle(String title);

}
