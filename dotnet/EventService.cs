namespace Services
{
    public class EventService : IEventService
    {
        IDataProvider _data = null;

        public EventService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<Event> Pagination(int pageIndex, int pageSize)
        {
            string procName = "dbo.Events_SelectPaginated";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
            (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Event _event = MapSingleEvent(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<Event>();
                }
                list.Add(_event);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Event> SearchPaginated(int pageIndex, int pageSize, DateTime startDate, DateTime endDate)
        {
            string procName = "dbo.Events_SearchPaginated";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@QStartDate", startDate);
                    param.AddWithValue("@QEndDate", endDate);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Event _event = MapSingleEvent(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Event>();
                    }
                    list.Add(_event);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Event Get(int id)
        {
            string procName = "[dbo].[Events_SelectById]";
            Event _event = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                _event = MapSingleEvent(reader, ref startingIndex);
            });
            return _event;
        }

        public int Add(EventAddRequest request, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Events_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@UserId", userId);
                SqlParameter IdOut = new SqlParameter("@Id", SqlDbType.Int);
                IdOut.Direction = ParameterDirection.Output;
                col.Add(IdOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(EventUpdateRequest request, int userId)

        {
            string procName = "[dbo].[Events_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", request.Id);
                col.AddWithValue("@PrimaryImageId", request.PrimaryImage.Id);

            },
            returnParameters: null);
        }
        public static void AddCommonParams(EventAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", request.Name);
            col.AddWithValue("@Headline", request.Headline);
            col.AddWithValue("@Description", request.Description);
            col.AddWithValue("@Summary", request.Summary);
            col.AddWithValue("@Slug", request.Slug);
            col.AddWithValue("@StatusId", request.StatusId);
            col.AddWithValue("@Url", request.PrimaryImage.Url);
            col.AddWithValue("@TypeId", request.PrimaryImage.TypeId);
            col.AddWithValue("@DateStart", request.DateStart);
            col.AddWithValue("@DateEnd", request.DateEnd);
            col.AddWithValue("@Address", request.Address);
            col.AddWithValue("@ZipCode", request.ZipCode);
            col.AddWithValue("@Latitude", request.Latitude);
            col.AddWithValue("@Longitude", request.Longitude);

        }
        public static Event MapSingleEvent(IDataReader reader, ref int startingIndex)
        {
            Event _event = new Event();
            _event.PrimaryImage = new Image();

            _event.Id = reader.GetSafeInt32(startingIndex++);
            _event.Name = reader.GetSafeString(startingIndex++);
            _event.Headline = reader.GetSafeString(startingIndex++);
            _event.Description = reader.GetSafeString(startingIndex++);
            _event.Summary = reader.GetSafeString(startingIndex++);
            _event.Slug = reader.GetSafeString(startingIndex++);
            _event.StatusId = reader.GetSafeInt32(startingIndex++);
            _event.UserId = reader.GetSafeInt32(startingIndex++);
            _event.PrimaryImage.Id = reader.GetSafeInt32(startingIndex++);
            _event.PrimaryImage.Url = reader.GetSafeString(startingIndex++);
            _event.PrimaryImage.TypeId = reader.GetSafeInt32(startingIndex++);
            _event.DateStart = reader.GetSafeDateTime(startingIndex++);
            _event.DateEnd = reader.GetSafeDateTime(startingIndex++);
            _event.Address = reader.GetSafeString(startingIndex++);
            _event.ZipCode = reader.GetSafeString(startingIndex++);
            _event.Latitude = reader.GetSafeDecimal(startingIndex++);
            _event.Longitude = reader.GetSafeDecimal(startingIndex++);
            _event.DateModified = reader.GetSafeDateTime(startingIndex++);
            _event.DateCreated = reader.GetSafeDateTime(startingIndex++);
            return _event;
        }

    }
}
