import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { type Step, Difficulty, StepType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface StepModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (step: Step) => void;
  initialStep?: Step; // Used for edit operations
}

const StepModal: React.FC<StepModalProps> = ({ show, onClose, onSubmit, initialStep }) => {
  const [form, setForm] = useState<Step>(() =>
    initialStep ?? {
      id: uuidv4(),
      task: '',
      input: '',
      outputName: '',
      outputValue: '',
      type: StepType.None,
    });

  useEffect(() => {
    if (show) {
      setForm(
        initialStep ?? {
          id: uuidv4(),
          task: '',
          input: '',
          outputName: '',
          outputValue: '',
          type: StepType.None,
        });
    }
  }, [show, initialStep]);

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

  const isEditing = !!initialStep;

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Step</Form.Label>
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
            <Form.Label>Step Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handleChange}>
              {Object.entries(StepType).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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

export default StepModal;
