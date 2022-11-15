USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_SearchPaginated]    Script Date: 11/15/2022 12:44:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	ALTER proc [dbo].[Events_SearchPaginated]
							@PageIndex int
							,@PageSize int
							,@QStartDate DateTime
							,@QEndDate DateTime

as

/*	
		
		Declare @PageIndex int = 0
				,@PageSize int = 4
				,@QStartDate  DateTime = '12-1-2022'
				,@QEndDate DateTime = '12-24-2022'
		
	Execute Events_SearchPaginated
						@PageIndex
						,@PageSize
						,@QStartDate
						,@QEndDate 
		
*/	
		
		
		
		
BEGIN

	Declare @Offset int = @PageIndex * @PageSize

		SELECT e.[Id]
			  ,[Name]
			  ,[Headline]
			  ,[Description]
			  ,[Summary]
			  ,[Slug]
			  ,[StatusId]
			  ,[UserId]
			  ,i.Id
			  ,i.Url
			  ,i.TypeId
			  ,[DateStart]
			  ,[DateEnd]
			  ,[Address]
			  ,[ZipCode]
			  ,[Latitude]
			  ,[Longitude]
			  ,DateModified
			  ,DateCreated
			  ,TotalCount = COUNT(1) OVER()
		  FROM [dbo].[Events] as e inner join dbo.Images as i
			on i.id = e.PrimaryImageId

		  WHERE (DateStart Between @QStartDate and @QEndDate)
		  ORDER By DateStart
		  
		 OFFSET @Offset ROWS
		 FETCH NEXT @PageSize ROWS ONLY

END




