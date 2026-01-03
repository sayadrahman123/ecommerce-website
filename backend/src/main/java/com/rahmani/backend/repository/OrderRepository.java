package com.rahmani.backend.repository;

import com.rahmani.backend.model.Order;
import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.OrderDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);
}
