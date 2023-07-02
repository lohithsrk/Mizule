package com.mizule.server.repositories;

import com.mizule.server.models.Zule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ZuleRepository extends JpaRepository<Zule, String> {
    @Query(value = "SELECT * FROM zule ORDER BY RANDOM() OFFSET :offset LIMIT :limit", nativeQuery = true)
    List<Zule> findRandomZules(@Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT * FROM zule WHERE genre = :genre ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Zule> findByGenre(@Param("genre") String genre, @Param("limit") int limit);

    @Query(value = "SELECT * FROM zule WHERE zule_id in :ids", nativeQuery = true)
    List<Zule> findByIds(@Param("ids") List<String> ids);

//    @Query(value = "SELECT * FROM zule WHERE title LIKE ?1%", nativeQuery = true)
//    List<Zule> findBySearchParam( String search);

    @Query(value = "SELECT * FROM zule WHERE (title LIKE CONCAT(CONCAT('% ', :search), ' %') OR title LIKE :search% OR title LIKE CONCAT('% ', :search))", nativeQuery = true)
    List<Zule> findBySearchParam(@Param("search") String search);
}
