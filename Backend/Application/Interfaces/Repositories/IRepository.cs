using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Repositories
{
	public interface IRepository<T>
	{
		void Add(T entity);
		Task<T> AddAsync(T entity);
		T[] AddRange(T[] entities);
		void Delete(T entity);

		Task<List<T>> GetAllAsync();

		Task<T> GetByIdAsync(Guid id);

		Task<List<T>> GetPagedReponseAsync(int pageNumber, int pageSize);

		int SaveChanges();

		Task<int> SaveChangesAsync();

		void Update(T entity);
	}
}