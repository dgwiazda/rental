package com.dgwiazda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dgwiazda.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	List<User> findByOrderByEmailAsc();
	List<User> findByOrderByEmailDesc();
	List<User> findByOrderByUsernameAsc();
	List<User> findByOrderByUsernameDesc();
}
