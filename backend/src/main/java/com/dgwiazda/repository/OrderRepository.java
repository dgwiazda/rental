package com.dgwiazda.repository;

import com.dgwiazda.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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


}
