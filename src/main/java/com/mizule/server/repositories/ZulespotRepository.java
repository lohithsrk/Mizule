package com.mizule.server.repositories;

import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ZulespotRepository extends JpaRepository<Zulespot, String> {

    @Query(value = "SELECT * FROM zule WHERE zule_id in :ids", nativeQuery = true)
    List<Zule> findByIds(@Param("ids") List<String> ids);

    Optional<Zulespot> findByOwner(String owner);

    Optional<Zulespot> findByTitle(String title);

}
