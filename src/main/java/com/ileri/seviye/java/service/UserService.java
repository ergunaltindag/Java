package com.ileri.seviye.java.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ileri.seviye.java.config.NotFoundException;
import com.ileri.seviye.java.config.UserAlreadyExistsException;
import com.ileri.seviye.java.dao.UserRepository;
import com.ileri.seviye.java.model.User;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public void add(User user) {

		if (userRepository.findByUsername(user.getUsername()).isPresent()
				&& userRepository.findByUsername(user.getUsername()).isPresent()) {
			throw new UserAlreadyExistsException(String.format("User with username '%s' or email '%s' already exists", user.getUsername(), user.getUsername()));
		} else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setProduct(false);
			user.setAddress(null);
			user.setCardNumber(null);
			user.setCvv(null);
			user.setExpiryDate(null);

			userRepository.save(user);
		}

	}

	public void addProduct(String username, User gelenUser) {

		Optional<User> userOptional = userRepository.findByUsername(username);
		User user = userOptional.get();

		if (userRepository.findById(user.getId()) != null) {
			user.setUsername(user.getUsername());
			user.setPassword(user.getPassword());
			user.setFirstName(user.getFirstName());
			user.setLastName(user.getLastName());
			user.setEmail(user.getEmail());
			user.setProduct(true);
			user.setAddress(gelenUser.getAddress());
			user.setExpiryDate(gelenUser.getExpiryDate());
			user.setCardNumber(gelenUser.getCardNumber());
			user.setCvv(gelenUser.getCvv());
			userRepository.save(user);

		} else {
			new NotFoundException("User not found");
		}
	}


	public void removeProduct(String username) {

		Optional<User> userOptional = userRepository.findByUsername(username);
		User user = userOptional.get();

		if (userRepository.findById(user.getId()) != null) {
			user.setUsername(user.getUsername());
			user.setPassword(user.getPassword());
			user.setFirstName(user.getFirstName());
			user.setLastName(user.getLastName());
			user.setEmail(user.getEmail());
			user.setProduct(false);
			user.setAddress(user.getAddress());
			user.setCardNumber(user.getCardNumber());
			user.setCvv(user.getCvv());
			user.setExpiryDate(user.getExpiryDate());
			userRepository.save(user);
		} else {
			new NotFoundException("User not found");
		}
	}

	public void delete(String username) {

		Optional<User> userOptional = userRepository.findByUsername(username);
		User user = userOptional.get();

		if (userRepository.findById(user.getId()) != null) {
			userRepository.deleteById(user.getId());
		} else {
			new NotFoundException("User not found");
		}

	}

	public boolean getProduct(String username) {
		Optional<User> userOptional = userRepository.findByUsername(username);
		if (!userOptional.isPresent()) {
			new NotFoundException("User not found");
		}

		User user = userOptional.get();
		return user.isProduct();
	}

	public User getUser(String username) {

		Optional<User> userOptional = userRepository.findByUsername(username);
		if (!userOptional.isPresent()) {
			new NotFoundException("User not found");
		}

		User user = userOptional.get();
		return user;
	}

}
