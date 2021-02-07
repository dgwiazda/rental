package com.dgwiazda.repository;

import com.dgwiazda.model.Order;
import com.dgwiazda.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT price from products where id = :itemIndex", nativeQuery = true)
    Float getPrice(@Param("itemIndex") Long itemIndex);


    List<Product> findByOrderByPriceAsc();
    List<Product> findByOrderByPriceDesc();
    List<Product> findByOrderByIdAsc();
    List<Product> findByOrderByIdDesc();

    @Query(value = "select id from (select id, availiable from products where id=1 or id=2) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableBiezniaId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

}
