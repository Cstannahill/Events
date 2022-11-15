USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Update]    Script Date: 11/15/2022 12:44:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	
			ALTER Proc [dbo].[Events_Update]
								
								  @Name nvarchar(50)
								  ,@Headline nvarchar(120)
								  ,@Description nvarchar(1000)
								  ,@Summary nvarchar(255)
								  ,@Slug nvarchar(100)
								  ,@StatusId int
								  ,@UserId int
								  ,@DateStart datetime2(7)
								  ,@DateEnd datetime2(7)
								  ,@Address nvarchar(128)
								  ,@ZipCode nvarchar(10)
								  ,@Latitude decimal(11,8)
								  ,@Longitude decimal(11,8)
								  ,@Url nvarchar(255)
								  ,@TypeId int
								  ,@PrimaryImageId int
								  ,@Id int

	
as 



/*

	Declare @Id int = 2
	
	Select *
	From dbo.Events
	Where Id = @Id



	Declare @Name nvarchar(50) = 'Test Event2'
			,@Headline nvarchar(120) = 'Test Headline2'
			,@Description nvarchar(1000) = 'Test Description of test event2.'
			,@Summary nvarchar(255) = 'Test summary2'
			,@Slug nvarchar(100) = 'Test summary2'
			,@StatusId int = 1
			,@UserId int = 1
			,@DateStart datetime2(7) = '2022-12-10 20:00:00.0000000'
			,@DateEnd datetime2(7) = '2022-12-10 23:00:00.0000000'
			,@Address nvarchar(128) = '209 E Washington St #1, Bloomington, IL'
			,@ZipCode nvarchar(10) = '61701'
			,@Latitude decimal(11,8)  = 40.48060421638542 
			,@Longitude decimal(11,8) = -88.99275082802792
			,@Url nvarchar(255)
			,@PrimaryImageId int
			,@TypeId int
			


		
			Execute Events_Update		 
								@Name
								,@Headline
								,@Description
								,@Summary
								,@Slug
								,@StatusId
								,@UserId
								,@DateStart
								,@DateEnd
								,@Address
								,@ZipCode
								,@Latitude
								,@Longitude
								,@Url
								,@TypeId
								,@PrimaryImageId
								,@Id

	Select *
	From dbo.Events


*/

BEGIN

		UPDATE [dbo].[Images]
		SET [Url] = @Url
			,TypeId = @TypeId
			Where @PrimaryImageId = Id
						



		UPDATE [dbo].[Events] 
	   SET [Name] = @Name
		  ,[Headline] = @Headline
		  ,[Description] = @Description
		  ,[Summary] = @Summary
		  ,[Slug] = @Slug
		  ,[UserId] = @UserId
		  ,[DateStart] = @DateStart
		  ,[DateEnd] = @DateEnd
		  ,[Address] = @Address
		  ,[ZipCode] = @ZipCode
		  ,[Latitude] = @Latitude
		  ,[Longitude] = @Longitude

	 WHERE Id = @Id


END

