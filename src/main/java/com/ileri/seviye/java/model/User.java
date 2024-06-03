package com.ileri.seviye.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shop_users")
public class User {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String username;
	    private String password;
	    private String firstName;
	    private String lastName;
	    private String email;
	    private boolean product;
	    private String address;
	    private String cardNumber; // maksimum 16 karakter
	    private String cvv; // maksimum 3 karakter
	    private String expiryDate; 
}
