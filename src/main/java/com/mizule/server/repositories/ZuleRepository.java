package com.mizule.server.repositories;

import com.mizule.server.models.Zule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ZuleRepository extends JpaRepository<Zule, String> {
    Optional<Zule> findByZulespotId(String zulespotId);

    @Query(value = "SELECT * FROM zule ORDER BY RANDOM() OFFSET :offset LIMIT :limit", nativeQuery = true)
    List<Zule> findRandomZules(@Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT * FROM zule WHERE genre = :genre ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Zule> findByGenre(@Param("genre") String genre, @Param("limit") int limit);

    @Query(value = "SELECT * FROM zule WHERE zule_id in :ids", nativeQuery = true)
    List<Zule> findByIds(@Param("ids") List<String> ids);
}
