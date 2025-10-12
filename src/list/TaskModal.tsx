import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { type Task, Difficulty, TaskType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialTask?: Task; // present for edit operations
}

const TaskModal: React.FC<TaskModalProps> = ({ show, onClose, onSubmit, initialTask }) => {
  const [form, setForm] = useState<Task>(() =>
    initialTask ?? {
      id: uuidv4(),
      task: '',
      input: '',
      outputName: '',
      outputValue: '',
      difficulty: Difficulty.None,
      type: TaskType.None,
      done: false,
    });

  useEffect(() => {
    if (show) {
      setForm(
        initialTask ?? {
          id: uuidv4(),
          task: '',
          input: '',
          outputName: '',
          outputValue: '',
          difficulty: Difficulty.None,
          type: TaskType.None,
          done: false,
        });
    }
  }, [show, initialTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'difficulty' ? (value as Difficulty) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  const isEditing = !!initialTask;

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="task"
              value={form.task}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Input</Form.Label>
            <Form.Control
              type="text"
              name="input"
              value={form.input}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reward/Output</Form.Label>
            <Form.Control
              type="text"
              name="outputName"
              value={form.outputName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Task Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handleChange}>
              {Object.entries(TaskType).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>


          {/* Add any other shared fields here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;
