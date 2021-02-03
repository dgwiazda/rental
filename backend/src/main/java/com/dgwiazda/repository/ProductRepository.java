package com.dgwiazda.repository;

import com.dgwiazda.model.Order;
import com.dgwiazda.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT price from products where id = :itemIndex", nativeQuery = true)
    Float getPrice(@Param("itemIndex") Long itemIndex);


    List<Product> findByOrderByPriceAsc();
    List<Product> findByOrderByPriceDesc();
    List<Product> findByOrderByIdAsc();
    List<Product> findByOrderByIdDesc();


}
