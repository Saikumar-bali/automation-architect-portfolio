import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'

const mockProject = {
  title: 'Test Project',
  description: 'A test project description',
  techStack: ['React', 'TypeScript', 'Vitest'],
  liveUrl: 'https://example.com',
  index: 0,
  slug: 'test-project',
  featured: false,
}

describe('ProjectCard', () => {
  it('renders project title, description, and tech stack', () => {
    render(
      <MemoryRouter>
        <ProjectCard {...mockProject} />
      </MemoryRouter>
    )

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText(/A test project description/i)).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
  })

  it('renders Live link with correct href when liveUrl is provided', () => {
    render(
      <MemoryRouter>
        <ProjectCard {...mockProject} />
      </MemoryRouter>
    )

    const liveLink = screen.getByRole('link', { name: /Live/i })
    expect(liveLink).toHaveAttribute('href', 'https://example.com')
    expect(liveLink).toHaveAttribute('target', '_blank')
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders Case Study section', () => {
    render(
      <MemoryRouter>
        <ProjectCard {...mockProject} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Case Study/i)).toBeInTheDocument()
  })

  it('shows featured badge when featured=true', () => {
    render(
      <MemoryRouter>
        <ProjectCard {...mockProject} featured={true} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Featured/i)).toBeInTheDocument()
  })
})
