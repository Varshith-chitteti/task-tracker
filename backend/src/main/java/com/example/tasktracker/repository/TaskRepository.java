

package com.example.tasktracker.repository;

import com.example.tasktracker.entity.Task;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class TaskRepository {

    @PersistenceContext
    private EntityManager em;

    // Get all tasks
    public List<Task> findAll() {
        return em.createQuery("SELECT t FROM Task t", Task.class).getResultList();
    }

    // Get a task by ID
    public Task findById(Long id) {
        return em.find(Task.class, id);
    }

    // Save a new task
    @Transactional
    public Task save(Task task) {
        em.persist(task);
        return task;
    }

    // Update an existing task
    @Transactional
    public Task update(Task task) {
        return em.merge(task);
    }

    // Delete a task by ID
    @Transactional
    public void delete(Long id) {
        Task task = em.find(Task.class, id);
        if (task != null) {
            em.remove(task);
        }
    }
}


