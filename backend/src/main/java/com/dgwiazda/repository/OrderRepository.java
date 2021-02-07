package com.dgwiazda.repository;

import com.dgwiazda.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    void deleteById(Long index);

    @Query(value = "SELECT * from orders where rent_date_from>GETDATE() order by rent_date_from", nativeQuery = true)
    List<Order> sortByRentDateFromAsc();

    List<Order> findByOrderByRentDateFromDesc();
    List<Order> findByOrderByPriceAsc();
    List<Order> findByOrderByPriceDesc();
    List<Order> findByOrderByUserIdAsc();

    @Query(value = "SELECT SUM(price) from orders where YEAR(rent_date_from)=YEAR(GETDATE()) group by MONTH(rent_date_from)", nativeQuery = true)
    List<Float> getMonthlySale();

    @Query(value = "SELECT SUM(price) from orders group by YEAR(rent_date_from)", nativeQuery = true)
    List<Float> getAnnuallySale();

    @Query(value = "select COUNT(*) from orders where user_id_id= :userIndex", nativeQuery = true)
    Long getOrderCount(@Param("userIndex") Long itemIndex);

    @Query(value = "select * from orders where user_id_id= :userIndex", nativeQuery = true)
    List<Order> getUserOrdersbyUserId(@Param("userIndex") Long userIndex);

    @Query(value = "select TOP(1)product_id from order_products where user_id_id= :orderIndex", nativeQuery = true)
    Long getProducIdByOrderId(@Param("orderIndex") Long orderIndex);

    @Query(value = "select COUNT(*) from order_products where user_id_id= :orderIndex", nativeQuery = true)
    Long getQuantityBy(@Param("orderIndex") Long orderIndex);

}
