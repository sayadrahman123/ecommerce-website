package com.rahmani.backend.repository;

import com.rahmani.backend.model.Order;
import com.rahmani.backend.model.Product;
import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.OrderDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END " +
            "FROM Order o JOIN o.orderItems oi " +
            "WHERE o.user = :user AND oi.product = :product AND o.status = 'PAID'") // Only count PAID orders
    boolean existsByUserAndProduct(@Param("user") User user, @Param("product") Product product);
}
