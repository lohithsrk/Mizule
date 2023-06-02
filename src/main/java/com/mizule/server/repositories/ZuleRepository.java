package com.mizule.server.repositories;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZuleRepository extends JpaRepository<Zule,String> {
    Optional<Zule> findByZulespotId(String zulespotId);
}
