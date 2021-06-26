using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Common;
using SkateSpot.Infrastructure.DbContexts;

namespace SkateSpot.Infrastructure.Repositories
{
	public abstract class Repository<T> : IRepository<T> where T : BaseEntity
	{
		protected readonly ApplicationDbContext _dbContext;

		public Repository(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public virtual async Task<T> AddAsync(T entity)
		{
			await _dbContext.Set<T>().AddAsync(entity);
			return entity;
		}

		public virtual void Add(T entity)
		{
			_dbContext.Set<T>().Add(entity);
		}

		public virtual T[] AddRange(T[] entities)
		{
			_dbContext.Set<T>().AddRange(entities);
			return entities;
		}

		public virtual void Delete(T entity)
		{
			_dbContext.Set<T>().Remove(entity);
		}

		public virtual async Task<List<T>> GetAllAsync()
		{
			return await _dbContext
				.Set<T>()
				.ToListAsync();
		}

		public virtual async Task<T> GetByIdAsync(Guid id)
		{
			return await _dbContext.Set<T>().FindAsync(id);
		}

		public virtual async Task<List<T>> GetPagedReponseAsync(int pageNumber, int pageSize)
		{
			return await _dbContext
				.Set<T>()
				.Skip((pageNumber - 1) * pageSize)
				.Take(pageSize)
				.AsNoTracking()
				.ToListAsync();
		}

		public virtual void Update(T entity)
		{
			_dbContext.Entry(entity).CurrentValues.SetValues(entity);
		}

		public virtual async Task<int> SaveChangesAsync()
		{
			return await _dbContext.SaveChangesAsync();
		}

		public virtual int SaveChanges()
		{
			return _dbContext.SaveChanges();
		}
	}
}