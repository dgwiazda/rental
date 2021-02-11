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



    @Query(value = "select COUNT(*) from orders where user_id= :userIndex", nativeQuery = true)
    Long getOrderCount(@Param("userIndex") Long itemIndex);

    @Query(value = "select TOP(1)product_id from order_products where order_id= :orderIndex", nativeQuery = true)
    Long getProducIdByOrderId(@Param("orderIndex") Long orderIndex);

    @Query(value = "select COUNT(*) from order_products where order_id= :orderIndex", nativeQuery = true)
    Long getQuantityBy(@Param("orderIndex") Long orderIndex);

    @Query(value = "select * from orders where user_id= :userIndex", nativeQuery = true)
    List<Order> getUserOrdersbyUserId(@Param("userIndex") Long userIndex);

    @Query(value = "select * from orders where user_id= :userIndex and rent_date_from>GETDATE() order by rent_date_from", nativeQuery = true)
    List<Order> sortUserOrdersbyRentDateFromAsc(@Param("userIndex") Long userIndex);

    @Query(value = "select * from orders where user_id= :userIndex order by rent_date_from desc", nativeQuery = true)
    List<Order> sortUserOrdersbyRentDateFromDesc(@Param("userIndex") Long userIndex);

    @Query(value = "select * from orders where user_id= :userIndex order by price", nativeQuery = true)
    List<Order> sortUserOrdersbyPriceAsc(@Param("userIndex") Long userIndex);

    @Query(value = "select * from orders where user_id= :userIndex order by price desc", nativeQuery = true)
    List<Order> sortUserOrdersbyPriceDesc(@Param("userIndex") Long userIndex);

    @Query(value = "select * from orders where user_id= :userIndex order by price", nativeQuery = true)
    List<Order> sortUserOrdersbyProductAsc(@Param("userIndex") Long userIndex);



    @Query(value = "select id from (select id, availiable from products where id=1 or id=2) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableBiezniaId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 1 or tab.product_id = 2) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getBiezniaIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=5 or id=6 or id=7) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableKajakId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 5 or tab.product_id = 6 or tab.product_id = 7) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getKajakIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 5 or tab.product_id = 6 or tab.product_id = 7) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getKajakIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 5 or tab.product_id = 6 or tab.product_id = 7) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getKajakIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=8 or id=9 or id=10 or id=11 or id=12 or id=13 or id=14 or id=15 or id=16 or id=17) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableMataId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 8 or tab.product_id = 9 or tab.product_id = 10 or tab.product_id = 11 or tab.product_id = 12 or tab.product_id = 13 or tab.product_id = 14 or tab.product_id = 15 or tab.product_id = 16 or tab.product_id = 17) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getMataIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 8 or tab.product_id = 9 or tab.product_id = 10 or tab.product_id = 11 or tab.product_id = 12 or tab.product_id = 13 or tab.product_id = 14 or tab.product_id = 15 or tab.product_id = 16 or tab.product_id = 17) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getMataIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 8 or tab.product_id = 9 or tab.product_id = 10 or tab.product_id = 11 or tab.product_id = 12 or tab.product_id = 13 or tab.product_id = 14 or tab.product_id = 15 or tab.product_id = 16 or tab.product_id = 17) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getMataIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=21 or id=22 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableRowerKolazowkaId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 21 or tab.product_id = 22) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerKolazowkaIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 21 or tab.product_id = 22) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerKolazowkaIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 21 or tab.product_id = 22) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerKolazowkaIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=23 or id=24 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableRowerGorskiId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 23 or tab.product_id = 24) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerGorskiIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 23 or tab.product_id = 24) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerGorskiIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 23 or tab.product_id = 24) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerGorskiIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=25 or id=26 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableRowerMiejskiId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 25 or tab.product_id = 26) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerMiejskiIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 25 or tab.product_id = 26) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerMiejskiIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 25 or tab.product_id = 26) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerMiejskiIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=27 or id=28 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableRowerStacjonarnyId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 27 or tab.product_id = 28) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerStacjonarnyIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 27 or tab.product_id = 28) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerStacjonarnyIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 27 or tab.product_id = 28) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getRowerStacjonarnyIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=29 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableSpadochronId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 29) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getSpadochronIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 29) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getSpadochronIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 29) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getSpadochronIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=30 ) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableSzynaCmpId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 30) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getSzynaCmpIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 30) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getSzynaCmpIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 30) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getSzynaCmpIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=32 or id=33) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableWorekTreningowyId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 32 or tab.product_id = 33) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getWorekTreningowyIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 32 or tab.product_id = 33) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getWorekTreningowyIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 32 or tab.product_id = 33) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getWorekTreningowyIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=34 or id=35) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableGruszkaId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 34 or tab.product_id = 35) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getGruszkaIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 34 or tab.product_id = 35) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getGruszkaIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 34 or tab.product_id = 35) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getGruszkaIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=36 or id=37 or id=38) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableZestawDoNartId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 36 or tab.product_id = 37 or tab.product_id = 38) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoNartIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 36 or tab.product_id = 37 or tab.product_id = 38) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoNartIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 36 or tab.product_id = 37 or tab.product_id = 38) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoNartIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=39 or id=40 or id=41 or id=42 or id=43 or id=44  or id=45 or id=46) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableZestawDoHokejaId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 39 or tab.product_id = 40 or tab.product_id = 41 or tab.product_id = 42 or tab.product_id = 43 or tab.product_id = 44 or tab.product_id = 45 or tab.product_id = 46) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoHokejaIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 39 or tab.product_id = 40 or tab.product_id = 41 or tab.product_id = 42 or tab.product_id = 43 or tab.product_id = 44 or tab.product_id = 45 or tab.product_id = 46) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoHokejaIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 39 or tab.product_id = 40 or tab.product_id = 41 or tab.product_id = 42 or tab.product_id = 43 or tab.product_id = 44 or tab.product_id = 45 or tab.product_id = 46) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoHokejaIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=47 or id=48 or id=49) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableZestawDoSnowboarduId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 47 or tab.product_id = 48 or tab.product_id = 49) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoSnowboarduIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 47 or tab.product_id = 48 or tab.product_id = 49) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoSnowboarduIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 47 or tab.product_id = 48 or tab.product_id = 49) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoSnowboarduIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select id from (select id, availiable from products where id=50 or id=51) as tab where tab.availiable=0" , nativeQuery = true)
    List<Long> getUnavailiableZestawDoWspinaczkiId();

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 50 or tab.product_id = 51) as tab1 where (tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoWspinaczkiIdToDisableRight(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 50 or tab.product_id = 51) as tab1 where (tab1.rent_date_from >= :rentDateFrom and tab1.rent_date_from <= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoWspinaczkiIdToDisableLeft(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);

    @Query(value = "select product_id from (select * from (select * from orders as o inner join order_products as op on op.order_id=o.id) as tab where tab.product_id = 50 or tab.product_id = 51) as tab1 where (tab1.rent_date_from <= :rentDateFrom and tab1.rent_date_from <= :rentDateTo and tab1.rent_date_to >= :rentDateFrom and tab1.rent_date_to >= :rentDateTo)", nativeQuery = true)
    List<Long> getZestawDoWspinaczkiIdToDisableInside(@Param("rentDateFrom") String rentDateFrom, @Param("rentDateTo") String rentDateTo);


    //wszystkie oprocz hal
}
