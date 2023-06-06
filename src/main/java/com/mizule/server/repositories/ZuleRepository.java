package com.mizule.server.repositories;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ZuleRepository extends JpaRepository<Zule,String> {
    Optional<Zule> findByZulespotId(String zulespotId);

    @Query(value = "SELECT * FROM zule ORDER BY RANDOM() OFFSET :offset LIMIT :limit", nativeQuery = true)
    List<Zule> findRandomZules(@Param("limit") int limit, @Param("offset") int offset);
}
