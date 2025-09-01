

package com.example.tasktracker.resource;

import com.example.tasktracker.entity.Task;

import com.example.tasktracker.repository.TaskRepository;

import javax.inject.Inject;

import javax.ws.rs.*;

import javax.ws.rs.core.MediaType;

import javax.ws.rs.core.Response;

import java.util.List;

@Path("/tasks")

@Produces(MediaType.APPLICATION_JSON)

@Consumes(MediaType.APPLICATION_JSON)

public class TaskResource {

    @Inject

    private TaskRepository taskRepository;

    @GET

    public List<Task> getAll() {

        return taskRepository.findAll();

    }

    @GET

    @Path("/{id}")

    public Task getById(@PathParam("id") Long id) {

        return taskRepository.findById(id);

    }

    @POST

    public Response create(Task task) {

        Task savedTask = taskRepository.save(task);

        return Response.status(Response.Status.CREATED).entity(savedTask).build();

    }

    @PUT

    @Path("/{id}")

    public Task update(@PathParam("id") Long id, Task task) {

        task.setId(id);

        return taskRepository.update(task);

    }

    @DELETE

    @Path("/{id}")

    public void delete(@PathParam("id") Long id) {

        taskRepository.delete(id);

    }

}
 